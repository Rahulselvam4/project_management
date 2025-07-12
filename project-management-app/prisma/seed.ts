import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
      role: 'MEMBER',
    },
  })

  // Create a team
  const team = await prisma.team.create({
    data: {
      name: 'Development Team',
      description: 'Main development team',
      members: {
        create: [
          { userId: admin.id },
          { userId: user.id },
        ],
      },
    },
  })

  // Create a sample project
  const project = await prisma.project.create({
    data: {
      name: 'Sample Project',
      description: 'This is a sample project to get started',
      status: 'ACTIVE',
      priority: 'HIGH',
      ownerId: admin.id,
      teamId: team.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Setup Database',
        description: 'Configure PostgreSQL database and Prisma schema',
        status: 'DONE',
        priority: 'HIGH',
        projectId: project.id,
        assigneeId: admin.id,
      },
      {
        title: 'Create User Authentication',
        description: 'Implement user login and registration',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: project.id,
        assigneeId: user.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
      {
        title: 'Design Dashboard UI',
        description: 'Create the main dashboard interface',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: project.id,
        assigneeId: user.id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })