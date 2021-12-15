CREATE TABLE game_modes (
  game_mode CHARACTER varying NOT NULL,
  CONSTRAINT game_modes_pkey PRIMARY KEY (game_mode)
);


INSERT INTO game_modes
VALUES ('headToHead'),
       ('multiplayer'),
       ('both');


ALTER TABLE decklists ADD COLUMN game_mode CHARACTER varying NOT NULL DEFAULT 'both';


ALTER TABLE decklists ADD CONSTRAINT decklists_game_mode_fkey
  FOREIGN KEY (game_mode) REFERENCES game_modes (game_mode) MATCH SIMPLE;
