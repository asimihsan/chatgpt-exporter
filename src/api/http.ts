import urlcat from 'urlcat'
import { apiUrl, baseUrl } from '../constants'
import { getPageAccessToken } from '../page'
import { memorize } from '../utils/memorize'

interface ApiSession {
    accessToken: string
    authProvider: string
    expires: string
    user: {
        email: string
        groups: string[]
        // token's issued_at timestamp
        iat: number
        id: string
        // token's expiration timestamp
        idp: string
        image: string
        intercom_hash: string
        // whether the user has multi-factor authentication enabled
        mfa: boolean
        name: string
        picture: string
    }
}

interface ApiAccountsCheckAccountDetail {
    account_user_role: 'account-owner' | string
    account_user_id: string | null
    processor: Record<string, boolean>
    account_id: string | null
    organization_id?: string | null
    is_most_recent_expired_subscription_gratis: boolean
    has_previously_paid_subscription: boolean
    name?: string | null
    profile_picture_id?: string | null
    profile_picture_url?: string | null
    structure: 'workspace' | 'personal'
    plan_type: 'team' | 'free'
    is_deactivated: boolean
    promo_data: Record<string, unknown>
}

interface ApiAccountsCheckEntitlement {
    subscription_id?: string | null
    has_active_subscription?: boolean
    subscription_plan?: 'chatgptteamplan' | 'chatgptplusplan'
    expires_at?: string | null
    billing_period?: 'monthly' | string | null
}

interface ApiAccountsCheckAccount {
    account: ApiAccountsCheckAccountDetail
    features: string[]
    entitlement: ApiAccountsCheckEntitlement
    last_active_subscription?: Record<string, unknown> | null
    is_eligible_for_yearly_plus_subscription: boolean
}

interface ApiAccountsCheck {
    accounts: {
        [key: string]: ApiAccountsCheckAccount
    }
    account_ordering: string[]
}

const enum ChatGPTCookie {
    AgeVerification = 'oai-av-seen',
    AllowNonessential = 'oai-allow-ne',
    DeviceId = 'oai-did',
    DomainMigrationSourceCompleted = 'oai-dm-src-c-240329',
    DomainMigrationTargetCompleted = 'oai-dm-tgt-c-240329',
    HasClickedOnTryItFirstLink = 'oai-tif-20240402',
    HasLoggedInBefore = 'oai-hlib',
    HideLoggedOutBanner = 'hide-logged-out-banner',
    IntercomDeviceIdDev = 'intercom-device-id-izw1u7l7',
    IntercomDeviceIdProd = 'intercom-device-id-dgkjq2bp',
    IpOverride = 'oai-ip-country',
    IsEmployee = '_oaiauth',
    IsPaidUser = '_puid',
    LastLocation = 'oai-ll',
    SegmentUserId = 'ajs_user_id',
    SegmentUserTraits = 'ajs_user_traits',
    ShowPaymentModal = 'ui-show-payment-modal',
    TempEnableUnauthedCompliance = 'temp-oai-compliance',
    Workspace = '_account',
}

const sessionApiUrl = urlcat(baseUrl, '/api/auth/session')
const accountsCheckApiUrl = urlcat(apiUrl, '/accounts/check/v4-2023-04-27')

export const getConversationApiUrl = (id: string) => urlcat(apiUrl, '/conversation/:id', { id })
export const getConversationsApiUrl = (offset: number, limit: number) => urlcat(apiUrl, '/conversations', { offset, limit })
export const getFileDownloadApiUrl = (id: string) => urlcat(apiUrl, '/files/:id/download', { id })
export const getProjectsApiUrl = () => urlcat(apiUrl, '/gizmos/snorlax/sidebar', { conversations_per_gizmo: 0 })
export const getProjectConversationsApiUrl = (gizmo: string, offset: number, limit: number) => {
    return urlcat(apiUrl, '/gizmos/:gizmo/conversations', { gizmo, cursor: offset, limit })
}

export async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    const accessToken = await getAccessToken()
    const accountId = await getTeamAccountId()

    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Authorization': `Bearer ${accessToken}`,
            ...(accountId ? { 'Chatgpt-Account-Id': accountId } : {}),
            ...options?.headers,
        },
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

async function _fetchSession(): Promise<ApiSession> {
    const response = await fetch(sessionApiUrl)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

const fetchSession = memorize(_fetchSession)

async function getAccessToken(): Promise<string> {
    const pageAccessToken = getPageAccessToken()
    if (pageAccessToken) return pageAccessToken

    const session = await fetchSession()
    return session.accessToken
}

async function _fetchAccountsCheck(): Promise<ApiAccountsCheck> {
    const accessToken = await getAccessToken()

    const response = await fetch(accountsCheckApiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Authorization': `Bearer ${accessToken}`,
        },
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

const fetchAccountsCheck = memorize(_fetchAccountsCheck)

const getCookie = (key: string) => document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`)?.pop() || ''

export async function getTeamAccountId(): Promise<string | null> {
    const accountsCheck = await fetchAccountsCheck()
    const workspaceId = getCookie(ChatGPTCookie.Workspace)
    if (workspaceId) {
        const account = accountsCheck.accounts[workspaceId]
        if (account) {
            return account.account.account_id
        }
    }

    return null
}
