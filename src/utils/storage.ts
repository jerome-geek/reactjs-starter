import { IssueAccessTokenResponse } from 'models/auth';

type LocalStorage = typeof window.localStorage;

enum TokenStorageKey {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    GUEST_TOKEN = 'GUEST_TOKEN',
}

interface AccessTokenInfo extends IssueAccessTokenResponse {
    expiry: number;
}

const PREFIX_LOCAL_STORAGE = 'VC_';

abstract class Storage<T extends string> {
    private readonly storage: LocalStorage;

    private getOriginKey(key: T) {
        return `${PREFIX_LOCAL_STORAGE}${key}`;
    }

    protected constructor(
        getStorage = (): LocalStorage => window.localStorage,
    ) {
        this.storage = getStorage();
    }

    protected get(key: T): string | null {
        // return this.storage.getItem(key);
        return this.storage.getItem(this.getOriginKey(key));
    }

    protected set(key: T, value: string): void {
        this.storage.setItem(this.getOriginKey(key), value);
    }

    protected clearItem(key: T): void {
        this.storage.removeItem(key);
    }

    protected clearItems(keys: T[]): void {
        keys.forEach((key) => this.clearItem(this.getOriginKey(key) as T));
    }
}

class TokenStorage extends Storage<TokenStorageKey> {
    constructor() {
        super();
    }

    getAccessToken(): Nullable<AccessTokenInfo> {
        const data = this.get(TokenStorageKey.ACCESS_TOKEN);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    setAccessToken(accessToken: string) {
        this.set(TokenStorageKey.ACCESS_TOKEN, accessToken);
    }

    getGuestToken() {
        const data = this.get(TokenStorageKey.GUEST_TOKEN);

        return data ? JSON.parse(data) : '';
    }

    setGuestToken(guestToken: string) {
        this.set(TokenStorageKey.GUEST_TOKEN, guestToken);
    }

    clear() {
        this.clearItems([TokenStorageKey.ACCESS_TOKEN]);
    }
}

const tokenStorage = new TokenStorage();

export { tokenStorage };
