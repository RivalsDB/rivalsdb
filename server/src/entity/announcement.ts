import { db, sql } from "../db.js";

export type Announcement = {
  announcementId: number;
  markdown: string;
  publishedAt: number; // ms epoch
};

export const toTransferObject = (announcement: Announcement) => announcement;

export async function fetchAllPublished(): Promise<Announcement[]> {
  const rows = await db.query(sql`
    SELECT announcement_id, markdown, published_at
    FROM announcements
    WHERE published_at <= NOW()
    ORDER BY published_at DESC;
  `);
  return rows.map(fromRow);
}

function fromRow(row: any): Announcement {
  return {
    announcementId: row.announcement_id,
    markdown: row.markdown,
    publishedAt: (row.published_at as Date).getTime(),
  };
}
