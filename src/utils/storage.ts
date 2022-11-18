type LocalStorage = typeof window.localStorage;

enum TOKEN_STORAGE_KEY {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    GUEST_TOKEN = 'GUEST_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
}

enum TOKEN_PREFIX {
    VC = 'VC',
    SHOPBY = 'SHOPBY',
}

interface AccessToken {
    accessToken: string;
    refreshToken?: string;
    expiry: number; // unix timestamp
}

abstract class Storage<T extends string> {
    private readonly storage: LocalStorage;
    private readonly prefix: TOKEN_PREFIX;

    private getOriginKey(key: T) {
        return `${this.prefix}_${key}`;
    }

    constructor(
        prefix: TOKEN_PREFIX,
        getStorage = (): LocalStorage => window.localStorage,
    ) {
        this.prefix = prefix;
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

class TokenStorage extends Storage<TOKEN_STORAGE_KEY> {
    getAccessToken(): Nullable<AccessToken> {
        const data = this.get(TOKEN_STORAGE_KEY.ACCESS_TOKEN);

        return data ? JSON.parse(data) : null;
    }

    setAccessToken(accessToken: string) {
        this.set(TOKEN_STORAGE_KEY.ACCESS_TOKEN, accessToken);
    }

    getGuestToken() {
        const data = this.get(TOKEN_STORAGE_KEY.GUEST_TOKEN);

        return data ? JSON.parse(data) : '';
    }

    setGuestToken(guestToken: string) {
        this.set(TOKEN_STORAGE_KEY.GUEST_TOKEN, guestToken);
    }

    getRefreshToken() {
        const data = this.get(TOKEN_STORAGE_KEY.REFRESH_TOKEN);

        return data ? JSON.parse(data) : '';
    }

    setRereshToken(refreshToken: string) {
        this.set(TOKEN_STORAGE_KEY.REFRESH_TOKEN, refreshToken);
    }

    clear() {
        this.clearItems([TOKEN_STORAGE_KEY.ACCESS_TOKEN]);
    }
}

// TODO: storage 역할 분리로 인해 제거 제거예정
const tokenStorage = new TokenStorage(TOKEN_PREFIX.SHOPBY);
const shopbyTokenStorage = new TokenStorage(TOKEN_PREFIX.SHOPBY);
const vcTokenStorage = new TokenStorage(TOKEN_PREFIX.VC);

export { tokenStorage, shopbyTokenStorage, vcTokenStorage };
