CREATE TABLE users
(
    user_id character varying,
    email character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE (email)
);
