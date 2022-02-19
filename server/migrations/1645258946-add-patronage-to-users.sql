CREATE TABLE patronage (
    patronage_type character varying NOT NULL,
    PRIMARY KEY (patronage_type)
);

INSERT INTO
    patronage
VALUES
    ('not_patron'),
    ('kindred');

ALTER TABLE
    users
ADD
    COLUMN patronage_type character varying NOT NULL DEFAULT 'not_patron';

ALTER TABLE
    users
ADD
    CONSTRAINT fk_users_patronage_type FOREIGN KEY (patronage_type)
    REFERENCES patronage (patronage_type) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE RESTRICT NOT VALID;

CREATE INDEX fki_fk_users_patronage_type
    ON users(patronage_type);
