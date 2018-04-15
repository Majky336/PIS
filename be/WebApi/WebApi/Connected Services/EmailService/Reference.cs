﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApi.EmailService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(Namespace="http://labss2.fiit.stuba.sk/pis/notificationservices/email", ConfigurationName="EmailService.EmailPortType")]
    public interface EmailPortType {
        
        // CODEGEN: Generating message contract since the wrapper namespace (http://labss2.fiit.stuba.sk/pis/notificationservices/email/types) of message notifyRequest does not match the default value (http://labss2.fiit.stuba.sk/pis/notificationservices/email)
        [System.ServiceModel.OperationContractAttribute(Action="http://labss2.fiit.stuba.sk/pis/notificationservices/email/#notify", ReplyAction="*")]
        WebApi.EmailService.notifyResponse notify(WebApi.EmailService.notifyRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://labss2.fiit.stuba.sk/pis/notificationservices/email/#notify", ReplyAction="*")]
        System.Threading.Tasks.Task<WebApi.EmailService.notifyResponse> notifyAsync(WebApi.EmailService.notifyRequest request);
        
        // CODEGEN: Generating message contract since the wrapper namespace (http://labss2.fiit.stuba.sk/pis/notificationservices/email/types) of message getPriceRequest does not match the default value (http://labss2.fiit.stuba.sk/pis/notificationservices/email)
        [System.ServiceModel.OperationContractAttribute(Action="http://labss2.fiit.stuba.sk/pis/notificationservices/email/#getPrice", ReplyAction="*")]
        WebApi.EmailService.getPriceResponse getPrice(WebApi.EmailService.getPriceRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://labss2.fiit.stuba.sk/pis/notificationservices/email/#getPrice", ReplyAction="*")]
        System.Threading.Tasks.Task<WebApi.EmailService.getPriceResponse> getPriceAsync(WebApi.EmailService.getPriceRequest request);
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="notify", WrapperNamespace="http://labss2.fiit.stuba.sk/pis/notificationservices/email/types", IsWrapped=true)]
    public partial class notifyRequest {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=0)]
        public string team_id;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=1)]
        public string password;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=2)]
        public string email;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=3)]
        public string subject;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=4)]
        public string message;
        
        public notifyRequest() {
        }
        
        public notifyRequest(string team_id, string password, string email, string subject, string message) {
            this.team_id = team_id;
            this.password = password;
            this.email = email;
            this.subject = subject;
            this.message = message;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="notifyResponse", WrapperNamespace="http://labss2.fiit.stuba.sk/pis/notificationservices/email/types", IsWrapped=true)]
    public partial class notifyResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=0)]
        public bool success;
        
        public notifyResponse() {
        }
        
        public notifyResponse(bool success) {
            this.success = success;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="getPrice", WrapperNamespace="http://labss2.fiit.stuba.sk/pis/notificationservices/email/types", IsWrapped=true)]
    public partial class getPriceRequest {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=0)]
        public int amount;
        
        public getPriceRequest() {
        }
        
        public getPriceRequest(int amount) {
            this.amount = amount;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="getPriceResponse", WrapperNamespace="http://labss2.fiit.stuba.sk/pis/notificationservices/email/types", IsWrapped=true)]
    public partial class getPriceResponse {
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="", Order=0)]
        public double price;
        
        public getPriceResponse() {
        }
        
        public getPriceResponse(double price) {
            this.price = price;
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface EmailPortTypeChannel : WebApi.EmailService.EmailPortType, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class EmailPortTypeClient : System.ServiceModel.ClientBase<WebApi.EmailService.EmailPortType>, WebApi.EmailService.EmailPortType {
        
        public EmailPortTypeClient() {
        }
        
        public EmailPortTypeClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public EmailPortTypeClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public EmailPortTypeClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public EmailPortTypeClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        WebApi.EmailService.notifyResponse WebApi.EmailService.EmailPortType.notify(WebApi.EmailService.notifyRequest request) {
            return base.Channel.notify(request);
        }
        
        public bool notify(string team_id, string password, string email, string subject, string message) {
            WebApi.EmailService.notifyRequest inValue = new WebApi.EmailService.notifyRequest();
            inValue.team_id = team_id;
            inValue.password = password;
            inValue.email = email;
            inValue.subject = subject;
            inValue.message = message;
            WebApi.EmailService.notifyResponse retVal = ((WebApi.EmailService.EmailPortType)(this)).notify(inValue);
            return retVal.success;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<WebApi.EmailService.notifyResponse> WebApi.EmailService.EmailPortType.notifyAsync(WebApi.EmailService.notifyRequest request) {
            return base.Channel.notifyAsync(request);
        }
        
        public System.Threading.Tasks.Task<WebApi.EmailService.notifyResponse> notifyAsync(string team_id, string password, string email, string subject, string message) {
            WebApi.EmailService.notifyRequest inValue = new WebApi.EmailService.notifyRequest();
            inValue.team_id = team_id;
            inValue.password = password;
            inValue.email = email;
            inValue.subject = subject;
            inValue.message = message;
            return ((WebApi.EmailService.EmailPortType)(this)).notifyAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        WebApi.EmailService.getPriceResponse WebApi.EmailService.EmailPortType.getPrice(WebApi.EmailService.getPriceRequest request) {
            return base.Channel.getPrice(request);
        }
        
        public double getPrice(int amount) {
            WebApi.EmailService.getPriceRequest inValue = new WebApi.EmailService.getPriceRequest();
            inValue.amount = amount;
            WebApi.EmailService.getPriceResponse retVal = ((WebApi.EmailService.EmailPortType)(this)).getPrice(inValue);
            return retVal.price;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<WebApi.EmailService.getPriceResponse> WebApi.EmailService.EmailPortType.getPriceAsync(WebApi.EmailService.getPriceRequest request) {
            return base.Channel.getPriceAsync(request);
        }
        
        public System.Threading.Tasks.Task<WebApi.EmailService.getPriceResponse> getPriceAsync(int amount) {
            WebApi.EmailService.getPriceRequest inValue = new WebApi.EmailService.getPriceRequest();
            inValue.amount = amount;
            return ((WebApi.EmailService.EmailPortType)(this)).getPriceAsync(inValue);
        }
    }
}
