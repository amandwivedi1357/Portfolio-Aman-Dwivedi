import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.skill.deleteMany()
  await prisma.project.deleteMany()
  await prisma.testimonial.deleteMany()

  // Seed Skills
  await prisma.skill.createMany({
    data: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Prisma', category: 'ORMs' }
    ]
  })

  // Seed Projects
  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing skills and projects',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        githubLink: 'https://github.com/yourusername/portfolio',
        liveLink: 'https://yourportfolio.com',
        imageUrl: '/images/portfolio-project.png'
      },
      {
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce application with payment integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        githubLink: 'https://github.com/yourusername/ecommerce',
        liveLink: 'https://yourecommerceapp.com',
        imageUrl: '/images/ecommerce-project.png'
      }
    ]
  })

  // Seed Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'John Doe',
        role: 'CEO',
        company: 'Tech Innovations Inc.',
        quote: 'Exceptional work and attention to detail. Highly recommended!',
        imageUrl: '/images/john-doe.jpg'
      },
      {
        name: 'Jane Smith',
        role: 'Product Manager',
        company: 'Digital Solutions LLC',
        quote: 'Collaborative and skilled professional. Great to work with!',
        imageUrl: '/images/jane-smith.jpg'
      }
    ]
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
