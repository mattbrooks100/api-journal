DROP TABLE IF EXISTS entry;

CREATE TABLE entry (
    id SERIAL,
    entry_date DATE,
    wake_feel TEXT,
    accomplish TEXT,
    main_entry TEXT,
    tomorrow TEXT
);