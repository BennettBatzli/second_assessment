CREATE TABLE zoo
    (
        id SERIAL NOT NULL,
        animal_type character varying(255) NOT NULL,
        number_of_animal character varying(255),
        CONSTRAINT zoo_pkey PRIMARY KEY (id)
    );