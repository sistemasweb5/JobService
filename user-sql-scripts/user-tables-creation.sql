CREATE IF NOT EXISTS TABLE category (
    id UUID NOT NULL,
    rol VARCHAR NOT NULL,
    CONSTRAINT category_pk PRIMARY KEY (id)
);

CREATE IF NOT EXISTS TABLE specialty (
    id UUID NOT NULL,
    name VARCHAR NOT NULL,
    clientId UUID NOT NULL,
    CONSTRAINT specialty_pk PRIMARY KEY (id)
);

CREATE IF NOT EXISTS TABLE workSchedule (
    id UUID NOT NULL,
    startTime VARCHAR NOT NULL,
    endTime VARCHAR NOT NULL,
    CONSTRAINT work_schedule_pk PRIMARY KEY (id)
);

CREATE IF NOT EXISTS TABLE client (
    id UUID NOT NULL,
    name VARCHAR NOT NULL,
    emailAddress VARCHAR NOT NULL,
    categoryId UUID NOT NULL,
    workScheduleId UUID NOT NULL,
    CONSTRAINT client_pk PRIMARY KEY (id)
);

INSERT INTO category (id, rol) VALUES
(gen_random_uuid(), 'client'),
(gen_random_uuid(), 'worker');

INSERT INTO workSchedule (id, startTime, endTime) VALUES
(gen_random_uuid(), '08:00', '16:00'),
(gen_random_uuid(), '09:00', '17:00');

INSERT INTO client (id, name, emailAddress, categoryId, workScheduleId) VALUES
(gen_random_uuid(), 'Alice Johnson', 'alice.j@example.com', 'e976fadb-8047-4057-b064-79bd981f4a9d', '8bf8be60-3f2a-4840-88a4-6cb36c0a01d9'),
(gen_random_uuid(), 'Bob Smith', 'bob.smith@example.com', 'e976fadb-8047-4057-b064-79bd981f4a9d', '8bf8be60-3f2a-4840-88a4-6cb36c0a01d9'),
(gen_random_uuid(), 'Carol White', 'carol.w@example.com', '64dccb39-5d7b-4ea9-8375-f056343d7889', '8bf8be60-3f2a-4840-88a4-6cb36c0a01d9'),
(gen_random_uuid(), 'David Lee', 'david.l@example.com', '64dccb39-5d7b-4ea9-8375-f056343d7889', '08acb5b4-3d9b-4fa9-964c-d2004e317497');

INSERT INTO specialty (id, name, clientId) VALUES
(gen_random_uuid(), 'Plumbing', 'bccdc4b9-f697-4b9e-9acc-9088006dafa4'),
(gen_random_uuid(), 'Electrical Work', '125df0fd-3cab-45b7-9eb3-adb75d23fe95');
