import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const {listingId, userId, authorId} = params;

    const query: any = {};

    // Find all reservations for a single listing looking at
    if (listingId) {
      query.listingId = listingId;
    }

    // Find all the trips user have
    if (userId) {
      query.userId = userId;
    }

    // Find all the reservations that other users made for our listing
    if (authorId) {
      query.listing = {userId: authorId};
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
