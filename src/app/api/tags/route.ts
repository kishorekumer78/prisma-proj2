import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// get all tags
export async function GET(request: NextRequest) {
	try {
		const tags = await prisma.tag.findMany();
		return NextResponse.json({
			success: true,
			message: 'Tags fetched successfully',
			data: tags
		});
	} catch (error) {
		return NextResponse.json({ success: false, message: 'Tags fetch failed', data: null });
	}
}

// create a tag
export async function POST(request: NextRequest) {
	try {
		const { title } = await request.json();

		const tag = await prisma.tag.create({
			data: {
				title: title,
				slug: title.toLowerCase().replace(' ', '-')
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Tag created successfully',
				data: { tag, id: tag.id.toString() }
			},
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Create tag failed',
				data: null
			},
			{ status: 500 }
		);
	}
}
