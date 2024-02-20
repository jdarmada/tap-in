

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function POST(req:any, res:any) {
  const prisma = new PrismaClient()

  if (req.method === 'POST') {
    const body = await req.json()
    const { title, content } = body

    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    })
    return NextResponse.json(post)
  }
}

// export async function POST(req:any, res:any) {
//   const { title, content } = req.body;
//   return res.status(200).json({ titleReceived: title, contentReceived: content });
// }
export async function GET(req:any, res:any) {
  const prisma = new PrismaClient()

  if (req.method === 'GET') {
    const posts = await prisma.post.findMany()
    return NextResponse.json(posts)
  }
}
export async function Delete(req:any, res:any) {
  const prisma = new PrismaClient()

  if (req.method === 'DELETE') {
    const { id } = req.body
    const post = await prisma.post.delete({
      where: {
        id,
      },
    })
    return res.status(200).json(post)
  }
} 
