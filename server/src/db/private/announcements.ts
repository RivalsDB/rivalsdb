import { db, sql } from "./_db.js";

interface Announcement {
  announcementId: number;
  markdown: string;
  publishedAt: number; // ms epoch
}

export async function fetchPublishedAnnoncements(): Promise<Announcement[]> {
  const rows = await db.query(sql`
    SELECT announcement_id, markdown, published_at
    FROM announcements
    WHERE published_at <= NOW()
    ORDER BY published_at DESC;
  `);
  return rows.map(rowToEntity);
}

function rowToEntity(row: any): Announcement {
  return {
    announcementId: row.announcement_id,
    markdown: row.markdown,
    publishedAt: (row.published_at as Date).getTime(),
  };
}
