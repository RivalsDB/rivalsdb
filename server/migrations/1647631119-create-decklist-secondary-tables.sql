CREATE TABLE decklist_metas
(
    decklist_id character varying,
    description text,
    PRIMARY KEY (decklist_id),
    CONSTRAINT decklist_metas_decklist_id_fk FOREIGN KEY (decklist_id)
        REFERENCES decklists (decklist_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

CREATE TYPE placement AS ENUM
    ('1st', '2nd', 'Top 4', 'Top 8', 'Top 16', 'Top 32', 'Top 64');

CREATE TABLE decklist_placings
(
    decklist_id character varying,
    placement placement NOT NULL,
    tournament_name character varying(140),
    start_date date NOT NULL,
    end_date date,
    tournament_size integer,
    PRIMARY KEY (decklist_id),
    CONSTRAINT decklist_placings_decklist_id_fk FOREIGN KEY (decklist_id)
        REFERENCES decklists (decklist_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT decklist_placings_date_check CHECK (end_date IS NULL OR end_date > start_date) NOT VALID,
    CONSTRAINT decklist_placings_tournament_size CHECK (tournament_size IS NULL OR tournament_size > 0) NOT VALID
);
