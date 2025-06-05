import IMembershipSubscriptionResponse from "../api/response/IMembershipSubscriptionResponse";

export default interface IMembershipSubscriptionApiResponse {
  statusCode: number;
  data: IMembershipSubscriptionResponse;
}
