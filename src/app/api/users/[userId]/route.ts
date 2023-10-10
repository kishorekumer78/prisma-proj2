import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
	try {
		let data = { email: 'user@email.com', firstName: 'Test Name', lastName: 'Test Last Name' }; // this data will come form request

		const user = await prisma.user.update({
			where: {
				id: BigInt(params.userId)
			},
			data: data
		});
		return NextResponse.json(
			{
				success: true,
				message: 'User updated successfully',
				data: { ...user, id: user.id.toString(), passwordHash: undefined }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'User not found',
				data: null
			},
			{ status: 404 }
		);
	}
}

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: BigInt(params.userId)
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'User fetched successfully',
				data: { ...user, id: user?.id.toString(), passwordHash: undefined }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'User not found',
				data: null
			},
			{ status: 404 }
		);
	}
}
export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
	try {
		const user = await prisma.user.delete({
			where: {
				id: BigInt(params.userId)
			}
		});
		return NextResponse.json(
			{
				success: true,
				message: 'User deleted successfully',
				data: { ...user, id: user?.id.toString(), passwordHash: undefined }
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				message: 'User not found',
				data: null
			},
			{
				status: 404
			}
		);
	}
}
