import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
	try {
		// const reqBody = await request.json();
		let data = { email: 'user@email.com', password: '123456' }; // this data will come form request

		const user = await prisma.user.create({
			data: {
				email: data.email,
				passwordHash: await bcrypt.hash(data.password, 10)
			}
		});

		return NextResponse.json(
			{
				success: true,
				message: 'User created successfully',
				data: { ...user, id: user.id.toString(), passwordHash: undefined }
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Create user failed',
				data: null
			},
			{ status: 500 }
		);
	}
}
export async function GET(request: NextRequest) {
	try {
		const users = await prisma.user.findMany();
		return NextResponse.json(
			{
				success: true,
				message: 'Users fetched successfully',
				data: users.map((user) => ({
					...user,
					id: user.id.toString(),
					passwordHash: undefined
				}))
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Users fetch failed',
				data: null
			},
			{ status: 500 }
		);
	}
}
