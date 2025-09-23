import { getApiUrl } from "./request";

function getAssetUrl(assetPath: string) {
	return getApiUrl(`assets/${assetPath}`);
}

export default getAssetUrl;
