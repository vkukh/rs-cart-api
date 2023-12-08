CREATE TYPE cart_status_enum AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE carts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    status cart_status_enum NOT NULL
);

CREATE TABLE cart_items (
    cart_id UUID REFERENCES carts(id),
    product_id UUID,
    count INTEGER
);

INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
('1cbf74a5-bacd-47c8-9667-3d4398a068f0', 'a3f0945d-2e60-4576-8fee-c0c2c0c0c3f0', '2023-01-01', '2023-01-01', 'OPEN'),
('72499267-14bc-48da-a254-54a583442352', '54ad9dc7-9df8-45e9-8a23-325a52d2edc9', '2023-01-01', '2023-01-02', 'ORDERED'),
('83511412-6623-4f1a-90db-a83be81e5d01', '54ad9dc7-9df8-45e9-8a23-325a52d2edc9', '2023-01-01', '2023-01-03', 'OPEN');

INSERT INTO cart_items (cart_id, product_id, count) VALUES
('1cbf74a5-bacd-47c8-9667-3d4398a068f0', '3403137d-5797-4e04-8a35-0ec4e9465241', 2),
('72499267-14bc-48da-a254-54a583442352', 'eddd97d0-6576-4c10-95b1-87936c08d706', 1),
('72499267-14bc-48da-a254-54a583442352', '4876aef6-046d-49ac-b609-cce8b7efcc60', 3),
('83511412-6623-4f1a-90db-a83be81e5d01', '3403137d-5797-4e04-8a35-0ec4e9465241', 1);