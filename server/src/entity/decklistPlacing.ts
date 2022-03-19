import { LocalDate } from "@js-joda/core";

export type DecklistPlacing = {
  decklistId: string;
  placement: string;
  startDate: LocalDate;
  endDate?: LocalDate;
  tournamentName?: string;
  tournamentSize?: number;
};
