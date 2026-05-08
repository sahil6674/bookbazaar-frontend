// Reads NEXT_PUBLIC_API_URL from .env.local
// Falls back to localhost if not set
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to get token from localStorage
// Reads token from browser's localStorage
// typeof window check is needed because Next.js runs some code on the SERVER where localStorage doesn't exist
function getToken(): string | null {
    if(typeof window === "undefined") return null;
    return localStorage.getItem("token");
}

// Generic fetch function
async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
    // Get token if user is logged in
    const token = getToken();

    // Build headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    // If token exists attach it to every request automatically
    if(token){
        headers["Authorization"] = `Bearer ${token}`;
    }

    // Make the actual fetch call
    const response = await fetch(`${BASE_URL}${endpoint}`,{
        ...options,
        headers,
    });

    // Parse JSON response
    const data = await response.json();

    // If backend returns error (400, 401, 500 etc.)
    // throw it so the calling code can catch it
    if(!response.ok){
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

// ── AUTH API ──
// authAPI handles everything auth-related
export const authAPI = {
    register: (body: {
        name: string;
        email: string;
        password: string;
        phone: string;
    }) =>
        apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    login: (body: {
        email: string;
        password: string;
    }) =>
        apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
        }),
};

// ── BOOKS API ──
// booksAPI handles everything books-related
export const booksAPI = {
    getAll: (params?: {
        category?: string;
        condition?: string;
        maxPrice?: string;
        search?: string;
    }) => {
        const query = new URLSearchParams(
            params as Record<string, string>
        ).toString();
        return apiFetch(`/books${query ? `?${query}` : ""}`);
    },

    getById: (id: string) => apiFetch(`/books/${id}`),

    create: (body: {
        title: string;
        subject: string;
        category: string;
        condition: string;
        price: number;
        originalPrice?: number;
        description: string;
    }) =>
        apiFetch("/books", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    delete: (id: string) =>
        apiFetch(`/books/${id}`, { method: "DELETE" }),

    update: (id: string, body: Record<string, unknown>) =>
        apiFetch(`/books/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        }),
};

export const userAPI = {
    getProfile: () => apiFetch("/users/me"),

    updateProfile: (body: {
        name?: string;
        location?: string;
        phone?: string;
    }) => 
        apiFetch("/users/me", {
            method: "PUT",
            body: JSON.stringify(body),
        }),

    getMyListings: () => apiFetch("/users/me/listings"),

    changePassword: (body: {
        currentPassword: string;
        newPassword: string;
    }) => 
        apiFetch("/users/me/password", {
            method: "PUT",
            body: JSON.stringify(body),
        }),
};