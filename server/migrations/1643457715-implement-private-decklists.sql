ALTER TABLE decklists
    ADD COLUMN public boolean NOT NULL DEFAULT True;

CREATE INDEX idx_decklists_public
    ON decklists USING btree
    (public ASC NULLS LAST);
