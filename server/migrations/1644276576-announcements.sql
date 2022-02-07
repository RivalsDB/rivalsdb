CREATE TABLE announcements (
    announcement_id serial NOT NULL,
    markdown text NOT NULL,
    published_at timestamp without time zone NOT NULL,
    PRIMARY KEY (announcement_id)
);

CREATE INDEX idx_announcements_published_at
    ON announcements USING btree
    (published_at ASC NULLS LAST);
