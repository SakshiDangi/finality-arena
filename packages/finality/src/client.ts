/* ============================================================================
 * Finality Client
 * ============================================================================
 * Responsible only for:
 * - connecting
 * - reporting connection status
 * ============================================================================
 */

export interface FinalityClientOptions {
  /**
   * Network endpoint.
   */
  readonly endpoint: string;

  /**
   * Optional API key.
   */
  readonly apiKey?: string;
}

export class FinalityClient {
  private connected = false;

  constructor(
    private readonly options: FinalityClientOptions,
  ) {}

  /**
   * Connect to Finality.
   */
  async connect(): Promise<void> {
    /**
     * TODO:
     *
     * Replace this placeholder with the actual
     * Finality SDK initialization.
     */

    this.connected = true;
  }

  /**
   * Disconnect.
   */
  async disconnect(): Promise<void> {
    this.connected = false;
  }

  /**
   * Connection status.
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Endpoint currently in use.
   */
  get endpoint(): string {
    return this.options.endpoint;
  }
}