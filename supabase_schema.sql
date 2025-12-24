-- Testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    testimonial TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery items table
CREATE TABLE gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    caption TEXT,
    category TEXT NOT NULL CHECK (category IN ('Hair', 'Facial', 'Bridal', 'Other')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    category TEXT,
    icon TEXT,
    image TEXT
);

-- Packages (offers) table
CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    discount TEXT,
    valid_until DATE,
    image TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON packages FOR SELECT USING (true);

-- Create policies for authenticated insert/update/delete
-- Note: In a real app you'd restrict this to authenticated users only.
-- For now, enabling for all to match the previous open API behavior, 
-- but ideally you should use: TO authenticated USING (true)
CREATE POLICY "Allow all operations" ON testimonials FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON gallery_items FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON enquiries FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON services FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON packages FOR ALL USING (true);

-- Insert default data
INSERT INTO services (title, description, price, category, icon) VALUES
('Herbal Facials', 'Rejuvenating facials using natural herbs and organic ingredients for glowing skin.', 'Starting from ₹500', 'Facial', '🌿'),
('Hair Care', 'Organic hair treatments, cuts, styling, and coloring with herbal products.', 'Starting from ₹300', 'Hair', '💇'),
('Bridal Makeup', 'Complete bridal packages with mehendi, makeup, and pre-wedding treatments.', 'Contact for price', 'Bridal', '👰'),
('Waxing Services', 'Gentle herbal waxing for smooth, irritation-free skin.', 'Starting from ₹200', 'Waxing', '✨'),
('Herbal Body Treatments', 'Full body scrubs, wraps, and massages using natural herbal blends.', 'Starting from ₹800', 'Body', '🍃'),
('Manicure & Pedicure', 'Luxurious nail care with organic products and herbal soaks.', 'Starting from ₹400', 'Nails', '💅');

INSERT INTO packages (title, description, discount, valid_until) VALUES
('Bridal Glow Package', 'Complete pre-wedding skincare with 5 herbal facials, body polishing, and hair spa.', 'Save 20%', '2025-01-31'),
('Festive Beauty Combo', 'Facial + Manicure + Pedicure + Hair Styling at a special combo price.', '₹500 Off', '2025-01-15'),
('First Visit Special', 'Get 15% off on all services for your first visit to Honey Herbal.', '15% Off', '2025-03-31');

INSERT INTO testimonials (name, role, testimonial, rating, image_url) VALUES
('Priya Sharma', 'Regular Client', 'The herbal facial was absolutely amazing! My skin has never felt so fresh and rejuvenated.', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'),
('Anita Menon', 'Bride', 'Best bridal makeup experience! They made my special day even more beautiful.', 5, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'),
('Kavitha Reddy', 'Loyal Customer', 'I love that they use all-natural products. My hair has never been healthier!', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80');
