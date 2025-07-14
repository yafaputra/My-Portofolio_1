// File: backend/seed.js 
const path = require('path'); 
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.development.local') });
const { sql } = require('@vercel/postgres'); 
const { educationHistory, skills, projects } = require('./data.js'); 

async function seed() { 
  try { 
    // Hapus tabel jika sudah ada (optional, untuk testing)
    await sql`DROP TABLE IF EXISTS education CASCADE;`;
    await sql`DROP TABLE IF EXISTS skills CASCADE;`;
    await sql`DROP TABLE IF EXISTS projects CASCADE;`;

    // Buat tabel education - sesuai dengan struktur data
    await sql`CREATE TABLE IF NOT EXISTS education (
      id SERIAL PRIMARY KEY, 
      institution VARCHAR(255), 
      major VARCHAR(255), 
      period VARCHAR(255)
    );`; 

    // Buat tabel skills - sesuai dengan struktur data lengkap
    await sql`CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,  
      name VARCHAR(255), 
      level INTEGER,
      category VARCHAR(255),
      icon TEXT,
      color VARCHAR(50)
    );`; 

    // Buat tabel projects - sesuai dengan struktur data lengkap
    await sql`CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY, 
      title VARCHAR(255), 
      image TEXT, 
      description TEXT, 
      tech TEXT[],
      link VARCHAR(255),
      category VARCHAR(255),
      status VARCHAR(255)
    );`; 

    console.log('Tabel berhasil dibuat.'); 

    // Insert data education
    await Promise.all(educationHistory.map(e => 
      sql`INSERT INTO education (institution, major, period) 
          VALUES (${e.institution}, ${e.major}, ${e.period});`
    )); 

    // Insert data skills - dengan semua field yang ada
    await Promise.all(skills.map(s => 
      sql`INSERT INTO skills (name, level, category, icon, color) 
          VALUES (${s.name}, ${s.level}, ${s.category}, ${s.icon}, ${s.color});`
    )); 

    // Insert data projects - dengan semua field yang ada
    await Promise.all(projects.map(p => 
      sql`INSERT INTO projects (title, image, description, tech, link, category, status) 
          VALUES (${p.title}, ${p.image}, ${p.description}, ${p.tech}, ${p.link}, ${p.category}, ${p.status});`
    )); 

    console.log('Proses seeding data berhasil!'); 
    
    // Tampilkan jumlah data yang berhasil diinsert
    const educationCount = await sql`SELECT COUNT(*) FROM education;`;
    const skillsCount = await sql`SELECT COUNT(*) FROM skills;`;
    const projectsCount = await sql`SELECT COUNT(*) FROM projects;`;
    
    console.log(`Data berhasil diinsert:`);
    console.log(`- Education: ${educationCount.rows[0].count} records`);
    console.log(`- Skills: ${skillsCount.rows[0].count} records`);
    console.log(`- Projects: ${projectsCount.rows[0].count} records`);
    
  } catch (error) {  
    console.error('Error seeding:', error);  
    process.exit(1); 
  } 
}  

seed();

// backend/data.js
const educationHistory = [
  { 
    id: 1, 
    period: '2023 - Sekarang', 
    institution: 'Universitas Amikom Yogyakarta', 
    major: 'S1 - Teknik Informatika' 
  },
  { 
    id: 2, 
    period: '2020 - 2023', 
    institution: 'SMK Muhammadiyah Imogiri', 
    major: 'Teknik Komputer dan Jaringan' 
  },
  { 
    id: 3, 
    period: '2017 - 2020', 
    institution: 'SMP Negeri 2 Sanden', 
    major: 'Pendidikan Menengah Pertama' 
  },
  { 
    id: 4, 
    period: '2011 - 2017', 
    institution: 'SD Negeri Tirtomulyo', 
    major: 'Pendidikan Dasar' 
  }
];

// backend/data.js
const skills = [
  {
    name: 'Vue.js',
    level: 95,
    category: 'Frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    color: '#4FC08D'
  },
  {
    name: 'JavaScript',
    level: 90,
    category: 'Programming',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    color: '#F7DF1E'
  },
  {
    name: 'Tailwind CSS',
    level: 92,
    category: 'Styling',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStVklzfGsO-6hPFSuutVa0ingPtO5KZgg2vA-irnqZosRmpp4HHc12Ir-taFq3oO4ujPo&usqp=CAU',
    color: '#06B6D4'
  },
  {
    name: 'Node.js',
    level: 75,
    category: 'Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933'
  },
  {
    name: 'Express.js',
    level: 70,
    category: 'Backend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    color: '#000000'
  },
  {
    name: 'PostgreSQL',
    level: 80,
    category: 'Database',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#336791'
  },
  {
    name: 'Git & GitHub',
    level: 88,
    category: 'Version Control',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032'
  },
  {
    name: 'HTML5 & CSS3',
    level: 95,
    category: 'Frontend',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    color: '#E34F26'
  }
];

const categories = ['Frontend', 'Backend', 'Database', 'Programming', 'Styling', 'Version Control'];

// ... (your existing educationHistory and projects data)

const projects = [
  {
    title: 'Figma Toko Online (Pick Up)',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Desain UI/UX untuk platform e-commerce dengan sistem pick-up yang memudahkan pelanggan mengambil barang langsung dari toko.',
    tech: ['Figma', 'UI/UX Design', 'Prototyping', 'Mobile First'],
    link: '#',
    category: 'Design',
    status: 'Completed'
  },
  {
    title: 'Web Sport Venue Booking',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Platform web untuk booking lapangan olahraga dengan fitur real-time availability, payment gateway, dan management system.',
    tech: ['Vue.js', 'Laravel', 'MySQL', 'Payment Gateway'],
    link: '#',
    category: 'Web Development',
    status: 'In Progress'
  },
  {
    title: 'Rangkaian Mikrokontroler IoT',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Sistem monitoring dan kontrol berbasis Arduino/ESP32 dengan integrasi sensor, actuator, dan komunikasi wireless.',
    tech: ['Arduino', 'ESP32', 'IoT', 'Sensors', 'C++'],
    link: '#',
    category: 'Hardware',
    status: 'Completed'
  }
];

// Single export statement
module.exports = { educationHistory, skills, projects };

const express = require('express');
const cors = require('cors');
const { sql } = require('@vercel/postgres');
const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.get('/api/education', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Gagal mengambil data pendidikan', details: error.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM skills;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Gagal mengambil data skill', details: error.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM projects;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Gagal mengambil data proyek', details: error.message });
  }
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

module.exports = app;

{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/dist/$1"
    }
  ]
}