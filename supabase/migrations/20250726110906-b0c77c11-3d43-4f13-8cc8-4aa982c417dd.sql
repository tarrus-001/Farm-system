-- Create enum types for better data consistency
CREATE TYPE animal_species AS ENUM ('cattle', 'goats', 'sheep', 'chickens', 'pigs', 'horses');
CREATE TYPE animal_gender AS ENUM ('male', 'female');
CREATE TYPE health_record_type AS ENUM ('vaccination', 'treatment', 'checkup', 'illness');
CREATE TYPE production_type AS ENUM ('milk', 'eggs', 'weight', 'wool');
CREATE TYPE transaction_type AS ENUM ('purchase', 'sale');

-- Animals table - main registry
CREATE TABLE animals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tag_number TEXT NOT NULL,
  name TEXT,
  species animal_species NOT NULL,
  breed TEXT,
  gender animal_gender NOT NULL,
  date_of_birth DATE,
  age_months INTEGER,
  photo_url TEXT,
  current_weight DECIMAL(8,2),
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, tag_number)
);

-- Health records for animals
CREATE TABLE health_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID NOT NULL,
  user_id UUID NOT NULL,
  record_type health_record_type NOT NULL,
  description TEXT NOT NULL,
  treatment_date DATE NOT NULL,
  veterinarian TEXT,
  cost DECIMAL(10,2),
  next_due_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Feeding schedules
CREATE TABLE feeding_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  species animal_species,
  feed_type TEXT NOT NULL,
  quantity_per_animal DECIMAL(8,2),
  feeding_times TEXT[], -- Array of times like ['06:00', '18:00']
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Feeding records (actual feeding logs)
CREATE TABLE feeding_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID NOT NULL,
  user_id UUID NOT NULL,
  feed_type TEXT NOT NULL,
  quantity DECIMAL(8,2) NOT NULL,
  feeding_time TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Breeding records
CREATE TABLE breeding_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  mother_id UUID NOT NULL,
  father_id UUID,
  mating_date DATE NOT NULL,
  expected_birth_date DATE,
  actual_birth_date DATE,
  offspring_count INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Production records (milk, eggs, weight tracking)
CREATE TABLE production_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id UUID NOT NULL,
  user_id UUID NOT NULL,
  production_type production_type NOT NULL,
  quantity DECIMAL(8,2) NOT NULL,
  unit TEXT NOT NULL, -- liters, kg, pieces, etc.
  recorded_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Sales and purchases
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  animal_id UUID NOT NULL,
  transaction_type transaction_type NOT NULL,
  party_name TEXT NOT NULL, -- buyer or seller name
  party_contact TEXT,
  price DECIMAL(10,2) NOT NULL,
  transaction_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE feeding_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE breeding_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for animals
CREATE POLICY "Users can view their own animals" ON animals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own animals" ON animals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own animals" ON animals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own animals" ON animals
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for health_records
CREATE POLICY "Users can view their animal health records" ON health_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create health records for their animals" ON health_records
  FOR INSERT WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM animals WHERE id = health_records.animal_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update their animal health records" ON health_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their animal health records" ON health_records
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for feeding_schedules
CREATE POLICY "Users can manage their feeding schedules" ON feeding_schedules
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for feeding_records
CREATE POLICY "Users can view their feeding records" ON feeding_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create feeding records for their animals" ON feeding_records
  FOR INSERT WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM animals WHERE id = feeding_records.animal_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update their feeding records" ON feeding_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their feeding records" ON feeding_records
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for breeding_records
CREATE POLICY "Users can manage their breeding records" ON breeding_records
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for production_records
CREATE POLICY "Users can view their production records" ON production_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create production records for their animals" ON production_records
  FOR INSERT WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM animals WHERE id = production_records.animal_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update their production records" ON production_records
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their production records" ON production_records
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for transactions
CREATE POLICY "Users can view their transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions for their animals" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id AND EXISTS (
    SELECT 1 FROM animals WHERE id = transactions.animal_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update their transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Add foreign key constraints
ALTER TABLE health_records ADD CONSTRAINT fk_health_records_animal 
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE;

ALTER TABLE feeding_records ADD CONSTRAINT fk_feeding_records_animal 
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE;

ALTER TABLE breeding_records ADD CONSTRAINT fk_breeding_records_mother 
  FOREIGN KEY (mother_id) REFERENCES animals(id) ON DELETE CASCADE;

ALTER TABLE breeding_records ADD CONSTRAINT fk_breeding_records_father 
  FOREIGN KEY (father_id) REFERENCES animals(id) ON DELETE SET NULL;

ALTER TABLE production_records ADD CONSTRAINT fk_production_records_animal 
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE;

ALTER TABLE transactions ADD CONSTRAINT fk_transactions_animal 
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE;

-- Create updated_at triggers
CREATE TRIGGER update_animals_updated_at
  BEFORE UPDATE ON animals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_records_updated_at
  BEFORE UPDATE ON health_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feeding_schedules_updated_at
  BEFORE UPDATE ON feeding_schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_breeding_records_updated_at
  BEFORE UPDATE ON breeding_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();