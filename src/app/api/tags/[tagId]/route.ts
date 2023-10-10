import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// get tag by tagId
export async function GET(request: NextRequest, { params }: { params: { tagId: string } }) {
	try {
		const tag = await prisma.tag.findUnique({
			where: {
				id: BigInt(params.tagId)
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Tag fetched successfully',
				data: { ...tag, id: tag?.id.toString() }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Tag not found',
				data: null
			},
			{ status: 404 }
		);
	}
}

// update a tag
export async function PUT(request: NextRequest, { params }: { params: { tagId: string } }) {
	try {
		const reqBody = await request.json();
		const updatedTag = await prisma.tag.update({
			where: {
				id: BigInt(params.tagId)
			},
			data: {
				...reqBody,
				slug: reqBody.title.toLowerCase().replace(' ', '-')
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Update tag successfully',
				data: { updatedTag, id: updatedTag.id.toString() }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Update tag failed',
				data: null
			},
			{ status: 500 }
		);
	}
}

// delete a tag by id
export async function DELETE(request: NextRequest, { params }: { params: { tagId: string } }) {
	try {
		const deletedTag = await prisma.tag.delete({
			where: {
				id: BigInt(params.tagId)
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Delete tag successfully',
				data: { deletedTag, id: deletedTag.id.toString() }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Delete tag failed',
				data: null
			},
			{ status: 500 }
		);
	}
}
