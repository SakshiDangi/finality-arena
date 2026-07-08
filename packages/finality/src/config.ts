import type {
  PrivateKey,
  PublicKey,
} from "@finality/core";

/* ============================================================================
 * Finality Adapter Configuration
 * ============================================================================
 */

export interface FinalityAdapterConfig {

  /**
   * Validator identity.
   */
  readonly validator: string;

  /**
   * Validator public key.
   */
  readonly publicKey: PublicKey;

  /**
   * Validator private key.
   */
  readonly privateKey: PrivateKey;

}

/* ============================================================================
 * Default Configuration
 * ============================================================================
 *
 * Development placeholder values.
 *
 * Replace with real validator keys before production.
 * ============================================================================
 */

export const defaultFinalityConfig: FinalityAdapterConfig = {

  validator: "arena-validator",

  publicKey:
    "PUBLIC_KEY_PLACEHOLDER" as PublicKey,

  privateKey:
    "PRIVATE_KEY_PLACEHOLDER" as PrivateKey,

};