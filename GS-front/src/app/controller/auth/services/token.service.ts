import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    getToken(): string | null {
        return isPlatformBrowser(this.platformId) ? localStorage?.getItem("token") : null;
    }

    setToken(token: string) {
        if (isPlatformBrowser(this.platformId)) localStorage?.setItem("token", token);
    }

    getRole(): string[] | undefined {
        return isPlatformBrowser(this.platformId) ? localStorage?.getItem("role")?.split(",") : undefined;
    }

    setRole(token: string[]) {
        if (isPlatformBrowser(this.platformId)) localStorage?.setItem("role", token.join(","));
    }

    clearToken() {
        if (isPlatformBrowser(this.platformId)) localStorage?.removeItem("token");
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
