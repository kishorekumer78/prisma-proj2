import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
// update
export async function PUT(request: NextRequest, { params }: { params: { categoryId: string } }) {
	try {
		const reqBody = await request.json();
		const updatedCategory = await prisma.category.update({
			where: {
				id: BigInt(params.categoryId)
			},
			data: {
				...reqBody,
				slug: reqBody.title.toLowerCase().replace(' ', '-')
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Update category successfully',
				data: { updatedCategory, id: updatedCategory.id.toString() }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Update category failed',
				data: null
			},
			{ status: 500 }
		);
	}
}
// delete
export async function DELETE(request: NextRequest, { params }: { params: { categoryId: string } }) {
	try {
		const deletedCategory = await prisma.category.delete({
			where: {
				id: BigInt(params.categoryId)
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Delete category successfully',
				data: { deletedCategory, id: deletedCategory.id.toString() }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Delete category failed',
				data: null
			},
			{ status: 500 }
		);
	}
}
// get one category
export async function GET(request: NextRequest, { params }: { params: { categoryId: string } }) {
	try {
		const category = await prisma.category.findUnique({
			where: {
				id: BigInt(params.categoryId)
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'Category fetched successfully',
				data: category
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'Category not found',
				data: null
			},
			{ status: 404 }
		);
	}
}
