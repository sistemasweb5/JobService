CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_client_id UUID NOT NULL,
    user_worker_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    job_type VARCHAR(50) NOT NULL, -- 'plumber', 'electrician', etc.
    status VARCHAR(20) NOT NULL CHECK (status IN ('not assigned', 'assigned', 'on the way', 'working', 'done')),
    description TEXT,
    price DECIMAL(10, 2) -- 10 digits in total and 2 decimals
);
