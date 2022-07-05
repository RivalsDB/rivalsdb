UPDATE decklists
SET
  content = jsonb_set_lax(
      jsonb_set(
        content,
        '{libraryDeck,core-all-tied-up}',
        content->'libraryDeck'->'core-all-tied up'
      ),
      '{libraryDeck,core-all-tied up}',
      null,
      true,
      'delete_key'
  )
WHERE content->'libraryDeck' ? 'core-all-tied up';
