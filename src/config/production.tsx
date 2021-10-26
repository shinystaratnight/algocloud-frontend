// Place the URL here with the /api suffix.
// Ex.:`https://domain.com/api`;
const backendUrl = `https://algocloud-backend.onrender.com/api`;

// SwaggerUI Documentation URL
// Leave black if documentation should be hidden
const apiDocumentationUrl = `https://algocloud-backend.onrender.com/documentation`;

/**
 * Frontend URL.
 */
const frontendUrl = {
  host: 'algocloud.org',
  protocol: 'https',
};

/**
 * Tenant Mode
 * multi: Allow new users to create new tenants.
 * multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
 * single: One tenant, the first user to register will be the admin.
 */
const tenantMode = 'multi';

/**
 * Plan payments configuration.
 */
const isPlanEnabled = true;
const stripePublishableKey = '';

export default {
  frontendUrl,
  backendUrl,
  apiDocumentationUrl,
  tenantMode,
  isPlanEnabled,
  stripePublishableKey
};
