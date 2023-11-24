const domainRegExp =
  /^(?:[a-zA-Z0-9](?:[-a-zA-Z0-9]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,20}$/

// Validate fully-qualified DNS domain name (no IDN)
export default function validateDomain(value: string): true | string {
  return RegExp(domainRegExp).test(value) || 'Invalid domain name'
}
