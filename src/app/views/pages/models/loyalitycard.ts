export interface LoyalityCard {
	id: number,
	cardNo: string
	circles: number,
	usedCircles: number,
	issueDate: Date
	percentageList: [],
	expired: boolean
}
