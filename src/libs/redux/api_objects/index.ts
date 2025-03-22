enum RateState{
    STAR = "STAR",
    LIKE = "LIKE"
}

interface RateRequest{
    post_id: number,
    like: RateState
}

interface Rate{
    user_id?: string,
    post_id?: string,
    like: RateState
}
interface Comment {
    id: number;
    content: string;
    post_id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
    post?:Post
    user?:User
}

interface Post {
    id: number;
    title: string;
    title_vi: string;
    description: string;
    description_vi: string;
    image?: string,
    star_count?: number,
    like_count?: number,
    rates?: Rate[]
}


interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    active?: boolean;
    fund?: string;
    remains?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
    services?: Service[];
    roles:Role[]
}

interface TotalFundsRemains {
    total_fund: number;
    total_remains: number;
}


interface FAQ {
    id?: number;
    question: string;
    question_vi?: string;
    answer: string;
    answer_vi?: string;
    created_at?: string;
    updated_at?: string;
}

interface RegisterUser {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

interface Category {
    id?: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
}

interface ITCategory {
    id?: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
    technologies?: Technology[]
}

interface PaymentStats {
    PENDING: number;
    COMPLETED: number;
    CANCELED: number;
}


interface Payment {
    id?: number;
    amount?: string;
    status?: string;
    user_id?: string;
    user?: User
    created_at?: string;
    updated_at?: string;
}
// Define the type for Project Statistic Revenue data
interface ProjectStatisticRevenueType {
  months: string[];  // Array of months (e.g. ["Jan", "Feb", "Mar", ...])
  revenue: number[]; // Array of revenue values corresponding to each month (e.g. [5000, 6000, 5500, ...])
}


interface Bank {
    id: string;
    account_holder_name: string;
    account_number: string;
    accumulated: string;
    last_transaction: string;
    label: string | null;
    active: string;
    created_at: string;
    bank_short_name: string;
    bank_full_name: string;
    bank_bin: string;
    bank_code: string;
}

interface Language {
    id?: number;
    name: string;
    icon: string;
    created_at?: string;
    updated_at?: string;
}

interface Contact {
    id?: number;
    fullname: string;
    email: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

interface Technology {
    id?: number;
    name?: string;
    icon?: string;
    created_at?: string;
    updated_at?: string;
    languages?: Language[];
    itcategories?: ITCategory[];
}

interface Service {
    id?: number;
    name?: string;
    price?: number;
    amount?: number;
    rate?: number;
    image?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    technologies?: Technology[],
    users?: User[]
}

interface Refund {
    id?: number;
    email: string;
    reason: string;
    status: string;
    amount: string;
    created_at: string
}

interface Cashflow {
    id?: number;
    fluctuation: number;
    balance: number;
    created_at: string;
    updated_at: string;
    email: string;
    user: User
}


interface ProjectStatisticRevenueType {
  revenueByMonth: Record<string, string>; // Key-value pair where the key is a string month (e.g., "2025-12") and the value is the revenue (e.g., "6003.00")
  totalProjects: number; // Total number of projects
  completedProjects: number; // Number of completed projects
  pendingProjects: number; // Number of pending projects
  inProgressProjects: number; // Number of in-progress projects
}

interface ProjectStatisticType {
    initalize: string,
    pending: number,
    in_progress: number,
    completed: number,
    canceled: number
}

interface Transaction {
  id: number;
  gateway: string;
  transaction_date: string;
  account_number: string;
  amount_in: string;
  amount_out: string | null;
  accumulated: string | null;
  code: string;
  transaction_content: string;
  reference_number: string | null;
  body: string | null;
  project_id: number;
  created_at: string;
  updated_at: string;
}
interface Project {
    id?: number;
    name: string;
    status: "initalize" | "pending" | "completed"; // Define possible status values
    service?: Service;
    price: number;
    duration: string; // Consider using Date type if parsed properly
    description: string;
    created_at: string;
    category_id: number;
    updated_at: string;
    user?: User
    files: any[]; // You may refine this type based on file structure
    technologies: number[] | Technology[];
    transactions: Transaction[]
}

interface UpdateProjectPayload {
    name?: string;
    price?: number;
    description?: string | null;
    status?: 'initalize' | 'pending' | 'in_progress' | 'completed' | 'canceled';
    duration?: string; // (YYYY-MM-DD)
    category_id?: number;
    service_id?: number | null;
    user_id?: string; // UUID
}



interface Setting {
    id?: number;
    time_update_service: string; // Format: "HH:mm:ss"
    time_update_order: string;
    time_deny_order: string;
    time_exchange_rate: string;
    account_no: string;
    phone: string;
    facebook: string;
    zalo: string;
    bank_id: number | null; // Integer, but can be null
}

interface Log {
    email: string;
    action: string;
    method: string;
    created_at: string;
}

interface LoginResponse {
    message: string,
    token: string,
    user: User
}
interface LoginType {
    email: string,
    password: string
}

interface BasicFilter {
    keyword?: string,
    page?: string | number,
    per_page?: string | number,
    payment_status?: string
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface ProjectInput {
    name: string;
    price: number;
    status: 'initalize' | 'pending' | 'in_progress' | 'completed' // Consider adding possible status values
    duration: string; // Consider using `Date` type if it's always a date
    category_id: number;
    files: any[]; // Adjust type based on file structure (e.g., `File[]` or `string[]` for URLs)
    technologies: number[];
}

interface SyncServiceTechnology {
    service_id: number,
    technology_ids: number[]
}

interface ChangePassword {
    user_id?: string;
    new_password?: string,
    new_password_confirmation?: string
}

interface CreateProject {
    name: string;
    price?: number | null;  // Price can be null or a number
    duration: string;  // Should be in "YYYY-MM-DD" format
    description?: string | null;  // Description can be null or a string
    category_id: number;  // Must be an existing category ID
    technologies?: number[];  // Optional array of technology IDs
    files?: { file: string }[];  // Optional array of files with URLs
}

interface UpdateProject extends CreateProject {
    user_id: string
}
interface ProjectFile {
    file: string
}

interface UpdateService {
    id: number;
    name: string;
    amount: number;
    price: number;
    description: string;
    rate: number;
    image: string;
}
interface Pivot {
    model_type: string;
    model_id: string;
    role_id: number;
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
}
 interface CreateTransactionPayload {
    gateway: string;
    transaction_date: string;
    account_number: string;
    amount_in?: number;
    amount_out?: number;
    accumulated?: number;
    code?: string;
    transaction_content: null;
    reference_number?: string;
    body?: string;
    project_id: number;
}


interface UserProfile {
  name: string;
  address: string;
  phone: string;
}

