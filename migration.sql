DROP TABLE IF EXISTS entry;

CREATE TABLE entry (
    id SERIAL,
    entry_date DATE,
    wake_feel TEXT,
    todo TEXT,
    main_entry TEXT,
    sleep_feel TEXT
);