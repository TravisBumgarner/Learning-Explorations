Need to figure out how to load credentials into aws without the following:

$ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE

# The access key for your AWS account.

$ export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

# The secret access key for your AWS account.

$ export AWS_SESSION_TOKEN=AQoDYXdzEJr...<remainder of security token>

# The session key for your AWS account. This is needed only when you are using temporary credentials.

# The AWS_SECURITY_TOKEN environment variable can also be used, but is only supported for backward compatibility purposes.

# AWS_SESSION_TOKEN is supported by multiple AWS SDKs other than PHP.
