CREATE INDEX idx_user_id
    ON decklists USING btree
    (user_id ASC NULLS LAST)
;
