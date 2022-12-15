DROP TABLE IF EXISTS entry;

CREATE TABLE entry (
    id SERIAL,
    entry_date DATE,
    wake_feel TEXT,
    todo TEXT,
    main_entry TEXT,
    sleep_feel TEXT
);

INSERT INTO entry (entry_date, wake_feel, todo, main_entry, sleep_feel) VALUES ('2022-12-14', 'Great', 'Work out, do laundry, write awesome code','Today was a good day. I did a whole lot of things. I learned so much. Wow.', 'Very tired');