export const formatJSONResponse = (response: Record<string, unknown>) => ({
  statusCode: 200,
  body: JSON.stringify(response),
});
