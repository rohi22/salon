export interface Batch {
	id: number,
	description: string,
	startingTime: Date
	endingTime: Date
	bufferTime: Date
	createdAt: Date
	updatedAt: Date
	createdBy: number
	updatedBy: number
}
