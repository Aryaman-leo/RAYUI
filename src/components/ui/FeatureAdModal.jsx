import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import userFeaturesService from "../../services/user-features.service";
import { X, Star, ArrowRight, Sparkles } from "lucide-react";

const FeatureAdModal = ({ 
  isOpen, 
  onClose, 
  featureName, 
  featureConfig 
}) => {
  const [isDismissing, setIsDismissing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Feature configurations
  const featureConfigs = {
    customize_agent: {
      title: "Customize Your AI Agent",
      subtitle: "New Feature Available!",
      description: "Take control of your job application process with our new Agent Customization feature. Set your preferences for applications per day, job priorities, work authorization, and more.",
      benefits: [
        "Set daily application limits",
        "Choose job application priorities", 
        "Filter by work authorization",
        "Customize job types and work modes",
        "Add your specific preferences"
      ],
      actionText: "Customize Agent",
      actionButtonClass: "bg-[#4318FF] hover:bg-[#3a14e6] text-white",
      icon: Sparkles,
      gradient: "from-[#4318FF] to-[#3a14e6]"
    }
    // Add more feature configurations here as needed
  };

  const config = featureConfigs[featureName] || featureConfig;

  if (!isOpen || !config) return null;

  const handleDismiss = async () => {
    setIsDismissing(true);
    try {
      await userFeaturesService.dismissFeature(featureName);
      onClose();
    } catch (error) {
      console.error("Error dismissing feature:", error);
      // Still close the modal even if API call fails
      onClose();
    } finally {
      setIsDismissing(false);
    }
  };

  const handleAction = async () => {
    setIsActionLoading(true);
    try {
      // Call the onAction callback if provided, otherwise just close
      if (config.onAction) {
        await config.onAction();
      }
      // Dismiss the feature after action
      await userFeaturesService.dismissFeature(featureName);
      onClose();
    } catch (error) {
      console.error("Error performing feature action:", error);
      // Still close the modal even if action fails
      onClose();
    } finally {
      setIsActionLoading(false);
    }
  };

  const IconComponent = config.icon || Star;

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div 
        className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto animate-in fade-in-0 zoom-in-95 duration-300"
        style={{
          background: "linear-gradient(180deg, #EAE6FF 0%, #FFFFFF 100%)",
        }}
      >
        {/* Header with announcement badge */}
        <div className="relative p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Announcement badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4318FF]/10 text-[#4318FF] text-xs font-semibold rounded-full mb-3">
                <div className="w-2 h-2 bg-[#4318FF] rounded-full animate-pulse"></div>
                {featureName === 'welcome' ? 'WELCOME' : 'NEW FEATURE'}
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {config.title}
              </h2>
              
              {/* Subtitle */}
              {config.subtitle && (
                <p className="text-sm text-gray-500 font-medium">
                  {config.subtitle}
                </p>
              )}
            </div>
            
            <button
              onClick={handleDismiss}
              disabled={isDismissing}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100/50"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-gray-700 mb-6 leading-relaxed text-base">
            {config.description}
          </p>

          {/* Benefits list */}
          {config.benefits && config.benefits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-[#4318FF] rounded-full"></div>
                What you can do:
              </h3>
              <div className="space-y-3">
                {config.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#4318FF] rounded-full mt-2"></div>
                    <span className="text-sm text-gray-600 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-3">
            <Button
              onClick={handleDismiss}
              disabled={isDismissing}
              className="px-6 py-2 bg-[#4318FF] hover:bg-[#3a14e6] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isDismissing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  Got it!
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </div>
          
          {/* Footer note */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            {featureName !== 'welcome' && (
            <p className="text-xs text-gray-500 text-center">
              You can always access this feature from your dashboard settings
            </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
};

export default FeatureAdModal;
