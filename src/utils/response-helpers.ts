export function transformResponse(data: any, optional?: any, statusCode = 200) {
  if (data.hasOwnProperty('docs')) {
    const { docs, ...meta } = data;
    optional = { ...optional, meta };
    data = docs;
  }

  return {
    statusCode: statusCode,
    status: statusCode < 400 ? 'success' : 'failed',
    data,
    ...optional,
  };
}
