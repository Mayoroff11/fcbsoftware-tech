import React, { useState, useEffect, useCallback } from 'react';
import { Invoice, AssetSymbol, NetworkId } from '../../types/payment.ts';
import { InvoiceService } from '../../services/InvoiceService.ts';
import { ASSETS, NETWORKS } from '../../config/cryptoConfig.ts';
import { CheckoutHeader } from './CheckoutHeader.tsx';
import { AssetSelector } from './AssetSelector.tsx';
import { NetworkSelector } from './NetworkSelector.tsx';
import { PaymentAmountDisplay } from './PaymentAmountDisplay.tsx';
import { PaymentAddressCard } from './PaymentAddressCard.tsx';
import { WrongNetworkWarning } from './WrongNetworkWarning.tsx';
import { NetworkFeeNotice } from './NetworkFeeNotice.tsx';
import { PaymentTimer } from './PaymentTimer.tsx';
import { PaymentStatusCard } from './PaymentStatusCard.tsx';
import { PaymentConfirmationCard } from './PaymentConfirmationCard.tsx';
import { ExpiredInvoiceCard } from './ExpiredInvoiceCard.tsx';
import { PaymentVerificationModal } from './PaymentVerificationModal.tsx';
import { Loader2, ShieldCheck, Sparkles, Check, Key, X, ArrowRight } from 'lucide-react';

interface PaymentPageProps {
  initialPlanId?: string;
  initialInvoiceId?: string;
  onNavigateHome: () => void;
  onOpenPricing?: () => void;
  onOpenSecurity?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenDevTeam?: () => void;
  onOpenRefundPolicy?: () => void;
  onOpenDocs?: () => void;
  onOpenSupport?: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  initialPlanId = '1m-personal',
  initialInvoiceId,
  onNavigateHome,
  onOpenPricing,
  onOpenSecurity,
  onOpenPrivacyPolicy,
  onOpenDevTeam,
  onOpenRefundPolicy,
  onOpenDocs,
  onOpenSupport
}) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGeneratingNew, setIsGeneratingNew] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false);

  // Initialize or restore invoice
  useEffect(() => {
    let isMounted = true;

    async function initInvoice() {
      setIsLoading(true);

      // Check if restoring existing invoice ID from props or URL
      if (initialInvoiceId) {
        const existing = InvoiceService.getInvoice(initialInvoiceId);
        if (existing) {
          if (isMounted) {
            setInvoice(existing);
            setIsLoading(false);
            window.location.hash = `checkout/${existing.id}`;
          }
          return;
        }
      }

      // If URL has hash #checkout/FCB-XXXXXX
      const hashMatch = window.location.hash.match(/#(?:checkout|payment)\/(FCB-[A-Z0-9]+)/i);
      if (hashMatch && hashMatch[1]) {
        const fromHash = InvoiceService.getInvoice(hashMatch[1]);
        if (fromHash) {
          if (isMounted) {
            setInvoice(fromHash);
            setIsLoading(false);
          }
          return;
        }
      }

      // Otherwise, create a brand new invoice with ATOMIC WALLET ROTATION
      const newInvoice = await InvoiceService.createInvoice(initialPlanId, 'BTC', 'bitcoin');
      if (isMounted) {
        setInvoice(newInvoice);
        setIsLoading(false);
        window.location.hash = `checkout/${newInvoice.id}`;
      }
    }

    initInvoice();

    return () => {
      isMounted = false;
    };
  }, [initialPlanId, initialInvoiceId]);

  // Handle asset switch
  const handleSelectAsset = async (newAsset: AssetSymbol) => {
    if (!invoice || invoice.status === 'confirmed' || invoice.status === 'expired') return;
    const assetConfig = ASSETS[newAsset] || ASSETS.BTC;
    const defaultNetwork = assetConfig.supportedNetworks[0].networkId;

    const updated = await InvoiceService.updateInvoiceAssetNetwork(invoice.id, newAsset, defaultNetwork);
    if (updated) {
      setInvoice({ ...updated });
    }
  };

  // Handle network switch
  const handleSelectNetwork = async (newNetwork: NetworkId) => {
    if (!invoice || invoice.status === 'confirmed' || invoice.status === 'expired') return;

    const updated = await InvoiceService.updateInvoiceAssetNetwork(invoice.id, invoice.asset, newNetwork);
    if (updated) {
      setInvoice({ ...updated });
    }
  };

  // Handle explicit "Generate New Invoice" (advances rotation A -> B -> C)
  const handleGenerateNewInvoice = async () => {
    setIsGeneratingNew(true);
    const planId = invoice ? invoice.planId : initialPlanId;
    const asset = invoice ? invoice.asset : 'BTC';
    const network = invoice ? invoice.network : 'bitcoin';

    const newInvoice = await InvoiceService.createInvoice(planId, asset, network);
    setInvoice(newInvoice);
    window.location.hash = `checkout/${newInvoice.id}`;
    setIsGeneratingNew(false);
  };

  // Handle timer expiry
  const handleExpire = useCallback(() => {
    if (invoice && invoice.status === 'awaiting_payment') {
      const updated = InvoiceService.updateStatus(invoice.id, 'expired');
      if (updated) {
        setInvoice({ ...updated });
      }
    }
  }, [invoice]);

  if (isLoading || !invoice) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-slate-800">Initializing Secure Checkout</h3>
            <p className="text-xs text-slate-500">Securing next rotational settlement address & market quote...</p>
          </div>
          <button
            type="button"
            onClick={onNavigateHome}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-violet-50 border border-slate-200 transition-colors cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // If status is confirmed
  if (invoice.status === 'confirmed') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <CheckoutHeader
          invoiceNumber={invoice.id}
          onNavigateHome={onNavigateHome}
          onGenerateNewInvoice={handleGenerateNewInvoice}
          onOpenPricing={onOpenPricing}
          onOpenSecurity={onOpenSecurity}
          onOpenPrivacyPolicy={onOpenPrivacyPolicy}
          onOpenDevTeam={onOpenDevTeam}
          onOpenRefundPolicy={onOpenRefundPolicy}
          onOpenDocs={onOpenDocs}
          onOpenSupport={onOpenSupport}
          isGeneratingNew={isGeneratingNew}
        />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <PaymentConfirmationCard
            invoice={invoice}
            onNavigateHome={onNavigateHome}
            onOpenDocs={onOpenDocs}
          />
        </main>
      </div>
    );
  }

  // If status is expired
  if (invoice.status === 'expired') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <CheckoutHeader
          invoiceNumber={invoice.id}
          onNavigateHome={onNavigateHome}
          onGenerateNewInvoice={handleGenerateNewInvoice}
          onOpenPricing={onOpenPricing}
          onOpenSecurity={onOpenSecurity}
          onOpenPrivacyPolicy={onOpenPrivacyPolicy}
          onOpenDevTeam={onOpenDevTeam}
          onOpenRefundPolicy={onOpenRefundPolicy}
          onOpenDocs={onOpenDocs}
          onOpenSupport={onOpenSupport}
          isGeneratingNew={isGeneratingNew}
        />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <ExpiredInvoiceCard
            invoice={invoice}
            onGenerateNewInvoice={handleGenerateNewInvoice}
            onNavigateHome={onOpenPricing || onNavigateHome}
            isGeneratingNew={isGeneratingNew}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      
      {/* Checkout Navigation Bar */}
      <CheckoutHeader
        invoiceNumber={invoice.id}
        onNavigateHome={onNavigateHome}
        onGenerateNewInvoice={handleGenerateNewInvoice}
        onOpenPricing={onOpenPricing}
        onOpenSecurity={onOpenSecurity}
        onOpenPrivacyPolicy={onOpenPrivacyPolicy}
        onOpenDevTeam={onOpenDevTeam}
        onOpenRefundPolicy={onOpenRefundPolicy}
        onOpenDocs={onOpenDocs}
        onOpenSupport={onOpenSupport}
        isGeneratingNew={isGeneratingNew}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Page Title & Plan Banner */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-700">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
              <span>Decentralized Cryptocurrency Settlement</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
              Complete Your License Payment
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your preferred cryptocurrency and network below to receive your cryptographic settlement invoice.
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-white border border-violet-100 shadow-xs flex items-center justify-between sm:justify-end gap-3 self-start sm:self-auto">
            <div className="text-left sm:text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">Selected Plan</div>
              <div className="text-xs font-bold text-slate-900">{invoice.planName}</div>
            </div>
            <div className="h-7 w-px bg-slate-200 hidden sm:block" />
            <div className="font-price font-extrabold text-violet-700 text-base sm:text-lg">
              ${invoice.usdAmount.toLocaleString('en-US')} USD
            </div>
          </div>
        </div>

        {/* Two-Column Responsive Checkout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left / Primary Column (Inputs, Address, Warnings, Amounts) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* 1 & 2. Compact Payment Method & Network Dropdowns */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-violet-100 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <AssetSelector
                  selectedAsset={invoice.asset}
                  onSelectAsset={handleSelectAsset}
                  disabled={invoice.status !== 'awaiting_payment'}
                />
                <NetworkSelector
                  selectedAsset={invoice.asset}
                  selectedNetwork={invoice.network}
                  onSelectNetwork={handleSelectNetwork}
                  disabled={invoice.status !== 'awaiting_payment'}
                />
              </div>
            </div>

            {/* 3. Payment Amount Display (Locked Quote) */}
            <PaymentAmountDisplay
              cryptoAmountFormatted={invoice.cryptoAmountFormatted}
              asset={invoice.asset}
              network={invoice.network}
              usdAmount={invoice.usdAmount}
              exchangeRate={invoice.exchangeRate}
            />

            {/* 4. Receiving Address Card & QR Code */}
            <PaymentAddressCard
              receivingAddress={invoice.receivingAddress}
              asset={invoice.asset}
              network={invoice.network}
              cryptoAmount={invoice.cryptoAmount}
              tokenContract={invoice.tokenContract}
            />

            {/* I've Made This Payment Prompt Banner */}
            {(invoice.status === 'awaiting_payment' || invoice.status === 'underpaid' || invoice.status === 'payment_not_yet_detected') && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-violet-600" />
                    <span>Already completed your transfer?</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Submit your transaction hash to verify and match the payment to your checkout.
                  </p>
                </div>
                <button
                  type="button"
                  id="btn-ive-made-payment-primary"
                  onClick={() => setShowVerificationModal(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all cursor-pointer shadow-md shadow-violet-500/25 flex items-center justify-center gap-1.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-violet-500/40 active:scale-98"
                >
                  <span>I've Made This Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* 5. Wrong Network Protection Warning */}
            <WrongNetworkWarning
              asset={invoice.asset}
              network={invoice.network}
            />

            {/* 6. Network Fee Notice */}
            <NetworkFeeNotice
              network={invoice.network}
            />

          </div>

          {/* Right / Secondary Column (Sticky Timer, Status, Timeline) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-20">
            
            {/* Payment Window Countdown */}
            <PaymentTimer
              expiresAt={invoice.expiresAt}
              onExpire={handleExpire}
            />

            {/* Status Card & Action Panel */}
            <PaymentStatusCard
              invoice={invoice}
              onGenerateNewInvoice={handleGenerateNewInvoice}
              onOpenVerificationModal={() => setShowVerificationModal(true)}
              isGeneratingNew={isGeneratingNew}
            />

            {/* Restrained Secondary Cancel Payment Option */}
            {invoice.status === 'awaiting_payment' && (
              <div className="pt-1 text-center">
                <button
                  type="button"
                  id="checkout-cancel-payment-btn"
                  onClick={() => setShowCancelModal(true)}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-3 rounded-xl hover:bg-slate-200/60 inline-flex items-center gap-1.5 cursor-pointer font-medium border border-transparent hover:border-slate-300"
                >
                  <span>Cancel Payment</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Payment Verification Modal */}
      {showVerificationModal && invoice && (
        <PaymentVerificationModal
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          invoice={invoice}
          onVerificationComplete={(updatedInvoice) => {
            setInvoice(updatedInvoice);
          }}
        />
      )}

      {/* Cancel Payment Professional Confirmation Modal */}
      {showCancelModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-payment-modal-title"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-7 max-w-md w-full border border-slate-200/90 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between">
              <h3 id="cancel-payment-modal-title" className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Cancel Payment?
              </h3>
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-800">
                Are you sure you want to leave this checkout?
              </p>
              <p>
                Your current payment session will be cancelled and you can return to the homepage. No payment will be completed by cancelling this checkout.
              </p>
            </div>

            <div className="pt-3 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                id="cancel-modal-keep-btn"
                onClick={() => setShowCancelModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/90 transition-colors cursor-pointer"
              >
                Keep Payment
              </button>
              <button
                type="button"
                id="cancel-modal-confirm-btn"
                onClick={() => {
                  setShowCancelModal(false);
                  onNavigateHome();
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel Payment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
