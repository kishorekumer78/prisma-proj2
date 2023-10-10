import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { title } = await request.json();

		const category = await prisma.category.create({
			data: {
				title: title,
				slug: title.toLowerCase().replace(' ', '-')
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Create category successfully',
				data: { category, id: category.id.toString() }
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Create category failed',
				data: null
			},
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		const categories = await prisma.category.findMany();
		return NextResponse.json(
			{
				success: true,
				message: 'Fetch categories successfully',
				data: categories.map((category) => ({
					...category,
					id: category.id.toString()
				}))
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Fetch categories failed',
				data: null
			},
			{ status: 500 }
		);
	}
}
