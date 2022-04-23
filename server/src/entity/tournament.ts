import { db, sql } from "../db.js";
import type { Content } from "./deck.js";
import * as GameMode from "./gameMode.js";
import { PatronageType } from "./patronage.js";
import { Placement } from "./placement.js";

type TournamentRow = {
  tournament_id: string;
  name: string;
  start_date: string;
  end_date: string;
  size: null | number;
};

type TournamentResult = {
  tournament: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    size: number | null;
  };
  decks: Array<{
    id: string;
    agenda: string;
    creatorId: string;
    creatorPatronage: PatronageType;
    factionDeck: string[];
    gameMode: GameMode.DB;
    haven: string;
    libraryDeck: Record<string, number>;
    public: boolean;
    placement: Placement;
    creatorDisplayName?: string;
    name?: string;
  }>;
};
export const fetchHallOfFame = async (): Promise<TournamentResult[]> => {
  const tournamentRows: TournamentRow[] = await db.query(sql`
    SELECT tournament_id, name, start_date::text, end_date::text, size
    FROM tournaments
  `);

  return await Promise.all(
    tournamentRows.map(async (trow) => {
      const deckRows: Array<{
        placement: Placement;
        decklist_id: string;
        content: Content;
        game_mode: GameMode.DB;
        public: boolean;
        user_id: string;
        patronage_type: PatronageType;
        name: null | string;
        display_name: null | string;
      }> = await db.query(sql`
        SELECT
          p.placement,
          d.name,
          d.decklist_id,
          d.content,
          d.game_mode,
          d.public,
          u.user_id,
          u.display_name,
          u.patronage_type
        FROM decklist_placings AS p
        INNER JOIN decklists AS d ON p.decklist_id = d.decklist_id
        INNER JOIN users AS u ON d.user_id = u.user_id
        WHERE p.tournament_id = ${trow.tournament_id}
    `);
      return {
        tournament: {
          id: trow.tournament_id,
          name: trow.name,
          startDate: trow.start_date,
          endDate: trow.end_date,
          size: trow.size,
        },
        decks: deckRows.map((deck) => ({
          id: deck.decklist_id,
          agenda: deck.content.agenda,
          creatorId: deck.user_id,
          creatorPatronage: deck.patronage_type,
          factionDeck: deck.content.factionDeck,
          gameMode: deck.game_mode,
          haven: deck.content.haven,
          libraryDeck: deck.content.libraryDeck,
          public: deck.public,
          placement: deck.placement,
          creatorDisplayName: deck.display_name ?? undefined,
          name: deck.name ?? undefined,
        })),
      };
    })
  );
};
