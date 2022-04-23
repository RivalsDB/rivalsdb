CREATE TABLE tournaments
(
    tournament_id character varying,
    name text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    size integer,
    PRIMARY KEY (tournament_id),
    CONSTRAINT tournament_dates_in_order CHECK (end_date >= start_date) NOT VALID,
    CONSTRAINT tournament_size_is_real CHECK (size IS NULL OR size > 0) NOT VALID
);

DROP TABLE decklist_placings;

CREATE TABLE decklist_placings
(
    decklist_id character varying,
    tournament_id character varying,
    placement placement NOT NULL,
    CONSTRAINT decklist_placings_pk PRIMARY KEY (tournament_id, decklist_id),
    CONSTRAINT decklist_placings_decklist_id_fk FOREIGN KEY (decklist_id)
        REFERENCES decklists (decklist_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT decklist_placings_tournament_id_fk FOREIGN KEY (tournament_id)
        REFERENCES tournaments (tournament_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
);

